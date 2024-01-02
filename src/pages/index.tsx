// 'use client'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {DataGrid, GridColDef, GridValueGetterParams, useGridApiRef} from '@mui/x-data-grid';
import React, {memo, useEffect, useLayoutEffect} from 'react';


import {Inter} from 'next/font/google'
import {useRouter} from 'next/router';
import {useAppState} from "@/context/AppStateContext";

const inter = Inter({subsets: ['latin']})

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 90},
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  {id: 1, lastName: 'Snow', firstName: 'Jon', age: 14},
  {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31},
  {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31},
  {id: 4, lastName: 'Stark', firstName: 'Arya', age: 11},
  {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
  {id: 6, lastName: 'Melisandre', firstName: "haha", age: 150},
  {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
  {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
  {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
];

export function Users() {
  const router = useRouter();
  const {appState, setAppState} = useAppState();
  const gridApiRef = useGridApiRef();

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 3,
    page: 0,
  });

  useEffect(() => {
    console.log(`save cache ${JSON.stringify(paginationModel)}`)
    setAppState({paginationModel: paginationModel})
  }, [paginationModel]);

  useLayoutEffect(() => {
    if (appState.useCache) {
      console.log(`apply cache ${JSON.stringify(appState)}`)
      setPaginationModel(appState.paginationModel)
    }
  }, []);

  const handleRowClick = (params: any) => {
    router.push(`/user/${params.id}`)
  };


  return (
      <Container sx={{height: '100vh'}}>
        <h1>Demo: Keep page state when go back</h1>
        <Box sx={{height: 400, width: '100%'}}>
          <DataGrid
              rows={rows}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={(data) => {
                setPaginationModel(data)
                // console.log(`save cache ${JSON.stringify(paginationModel)}`)
                // setAppState({paginationModel: data})
              }}
              onRowClick={handleRowClick}
              pageSizeOptions={[3, 5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              apiRef={gridApiRef}
          />
        </Box>
        <Box>
          AppState: {JSON.stringify(appState)}
        </Box>
      </Container>
  )
}

export default memo(Users)
