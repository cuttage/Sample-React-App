import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import './Main.scss'
import { useEffect, useState } from 'react'
import JobDetails from './JobDetails'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function CardDetail({ info, page, loading }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const [selectedCard, setSelectedCard] = useState(null)

  const handleCloseIcon = () => {
    setOpen(false)
  }

  useEffect(() => {
    console.log(open, 'open')
  }, [open])

  return (
    <div className="grandWrapper">
      <div className="infos">{loading}</div>
      <div className="wrapper">
        {info?.map((each) => (
          <Card sx={{ minWidth: 275 }} className="child">
            <CardContent className="grow">
              {each.title.length > 0 && (
                <>
                  <Typography variant="h5" classes={{ root: 'ellipsis' }}>
                    {each.title.charAt(0).toUpperCase() + each.title.slice(1)}
                  </Typography>
                  <Divider />
                </>
              )}
              {each.location.city.length > 0 && (
                <>
                  <Typography>
                    {each.location.city.charAt(0).toUpperCase() +
                      each.location.city.slice(1)}
                  </Typography>
                  <Divider />
                </>
              )}
              {each.career_level.length > 0 && (
                <>
                  <Typography>{each.career_level}</Typography>
                  <Divider />
                </>
              )}
              <div className="cardlistitems">
                {each?.industry?.map((item, i) => (
                  <div key={i + item}>
                    <Typography variant="body2">
                      {item.charAt(0).toUpperCase() + item.slice(1) + ','}
                    </Typography>
                  </div>
                ))}
                {each?.skills?.map((item, i, all) => (
                  <div key={i + item}>
                    {i + 1 === all.length ? (
                      <Typography variant="body2">
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        {item.charAt(0).toUpperCase() + item.slice(1) + ','}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                sx={{ color: 'darkblue', border: '1px solid #1b0f90' }}
                onClick={() => {
                  setSelectedCard(info.filter((z) => z.uuid === each.uuid))
                  handleOpen()
                }}
              >
                View
              </Button>
            </CardActions>
          </Card>
        ))}
        {open && (
          <div className="modalparent">
            <JobDetails
              open={open}
              info={selectedCard && selectedCard[0]}
            ></JobDetails>
            <IconButton
              onClick={handleCloseIcon}
              sx={{
                position: 'fixed',
                right: '5px',
                top: '10px',
                color: 'darkblue',
                border: '1px solid #1b0f90',
                backgroundColor: 'white',
              }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  )
}
