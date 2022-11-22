import './App.css'
import Filter from './components/Filter'
import Main from './components/Main'
import { useCallback, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import './components/Filter.scss'
import { useState, useRef } from 'react'
import Pagination from '@mui/material/Pagination'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import PaginationItem from '@mui/material/PaginationItem'
import Typography from '@mui/material/Typography'

function App() {
  const apiUrl = 'https://devapi-indexer.elevatustesting.xyz/api/v1/jobs'
  const reqB1 = 'ee5d991c-cdc6-4e83-b0b3-96f147208549'
  const reqB2 = ''
  const reqB3 = 7
  const [titles, setTitles] = useState([])
  const [info, setInfo] = useState([])
  const [filteredInfo, setFilteredInfo] = useState([])
  let reqB4 = useRef(0)
  const [highestPage, setHighestPage] = useState(null)
  const [highestPageSent, setHighestPageSent] = useState(null)
  const dataFetchedRef = useRef(false)
  const [unique, setUnique] = useState([])

  const [page, setPage] = useState(1)

  const [value, setValue] = useState('')
  const [sent, setSent] = useState(false)

  const handleInputChange = (event) => {
    setValue(event.target.value)
    console.log(value, 'value')
    if (!event?.target?.value || event?.target?.value?.length === 0) {
      setSent(false)
    }
  }

  const handleSelectionChange = (event, values) => {
    setValue(values)
    console.log(value, 'value sel')
    if (!values || values?.length === 0) {
      setSent(false)
    }
  }

  const handleChange = (event, value) => {
    setPage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setFilteredInfo(
      info
        .map((x) => x.jobs.filter((y) => y.title === value))
        .filter((z) => z.length > 0)
        .flat()
    )
    setHighestPageSent(1)
    setSent(true)
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

  useEffect(() => {
    console.log(info, value)
  }, [info, value])

  return (
    <div className="App">
      <header className="App-header">
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'black',
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'left',
              margin: '20px',
              paddingLeft: '20px',
            }}
          >
            Logo
          </Typography>
        </AppBar>
        <Filter>
          <AppBar
            position="static"
            color="transparent"
            classes={{ root: 'appbar' }}
          >
            <form onSubmit={handleSubmit} className="appbarchild">
              <Autocomplete
                disabled={!highestPage}
                sx={{ width: 300 }}
                classes={{ root: 'acm' }}
                id="free-solo"
                freeSolo
                options={unique.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} label="Job Title" />
                )}
                onInputChange={handleInputChange}
                onChange={handleSelectionChange}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: 'darkblue' }}
                disabled={!value || value?.length === 0}
              >
                Search
              </Button>
            </form>
          </AppBar>
        </Filter>
        {sent
          ? filteredInfo?.length > 0 && (
              <Main
                info={filteredInfo}
                page="1"
                loading={'Recent Openings'}
              ></Main>
            )
          : info?.length > 0 &&
            info
              .filter((x) => x?.jobs?.length > 0)
              .map(
                (singleInfo) =>
                  singleInfo?.page === page && (
                    <Main
                      info={singleInfo?.jobs}
                      page={singleInfo?.page}
                      loading={
                        !highestPage ? 'Data is loading...' : 'Recent Openings'
                      }
                    ></Main>
                  )
              )}
        <div style={{ padding: '16px' }}>
          <Pagination
            count={!sent ? highestPage - 1 : highestPageSent}
            page={page}
            onChange={handleChange}
            variant="outlined"
            size="large"
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                sx={{
                  color: 'darkblue',
                  border: '1px solid transparent',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: 'darkblue',
                    border: '1px solid darkblue',
                  },
                }}
                components={{
                  next: (props) => (
                    <div
                      style={{
                        color: 'grey',
                        border: '1px solid transparent',
                        margin: '2px',
                      }}
                      type="button"
                      {...props}
                    >
                      Next
                    </div>
                  ),
                  previous: (props) => (
                    <div
                      style={{
                        color: 'grey',
                        border: '1px solid transparent',
                        margin: '2px',
                      }}
                      type="button"
                      {...props}
                    >
                      Previous
                    </div>
                  ),
                }}
                {...item}
              />
            )}
            showFirstButton
            showLastButton
          />
        </div>
      </header>
    </div>
  )
}

export default App
