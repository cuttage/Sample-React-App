import './App.css'
import Filter from './components/Filter'
import Main from './components/Main'
import { useCallback, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import AutocompleteInput from './components/AutocompleteInput'
import AppBar from '@mui/material/AppBar'
import './components/Filter.scss'
import { useState, useRef } from 'react'
import Pagination from '@mui/material/Pagination'

function App() {
  const apiUrl = 'https://devapi-indexer.elevatustesting.xyz/api/v1/jobs'
  const reqB1 = 'ee5d991c-cdc6-4e83-b0b3-96f147208549'
  const reqB2 = ''
  const reqB3 = 7
  const [titles, setTitles] = useState([])
  const [info, setInfo] = useState([])
  let reqB4 = useRef(0)
  const [highestPage, setHighestPage] = useState(null)
  const dataFetchedRef = useRef(false)
  const [unique, setUnique] = useState([])

  const [page, setPage] = useState(1)
  const handleChange = (event, value) => {
    setPage(value)
  }

  const callRecursive = useCallback(() => {
    axios
      .get(apiUrl, {
        params: {
          language_profile_uuid: reqB1,
          itemQuery: reqB2,
          limit: reqB3,
          page: reqB4.current,
        },
        headers: {
          'Accept-Account': '961c06eb-7e25-406c-87d5-d0742e09d96c',
          'Accept-Company': '900a776e-a060-422e-a5e3-979ef669f16b',
        },
      })
      .then((response) => {
        setTitles((current) => [
          ...current,
          ...response.data.results.jobs.map((x) => ({
            title: x.title,
          })),
        ])
        setInfo((current) => [
          ...current,
          { jobs: response.data.results.jobs, page: reqB4.current },
        ])
        reqB4.current = reqB4.current + 1
        if (response.data.results.jobs < reqB3) {
          setHighestPage(reqB4.current)
          return response
        } else {
          callRecursive()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    if (dataFetchedRef.current) return
    dataFetchedRef.current = true
    callRecursive()
  }, [callRecursive])

  useEffect(() => {
    setUnique(
      titles.filter((x, y, z) => y === z.findIndex((m) => m.title === x.title))
    )
  }, [titles])

  return (
    <div className="App">
      <header className="App-header">
        <Filter>
          <AppBar
            position="static"
            color="transparent"
            classes={{ root: 'appbar' }}
          >
            <AutocompleteInput titles={unique}></AutocompleteInput>
            <Button variant="contained">Contained</Button>
          </AppBar>
        </Filter>
        {info?.length > 0 &&
          info
            .filter((x) => x.jobs.length > 0)
            .map(
              (singleInfo) =>
                singleInfo.page === page && (
                  <Main info={singleInfo?.jobs} page={singleInfo?.page}></Main>
                )
            )}
        <Pagination
          count={highestPage - 1}
          page={page}
          onChange={handleChange}
        />
      </header>
    </div>
  )
}

export default App
