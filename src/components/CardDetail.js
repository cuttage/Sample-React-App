import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import './Main.scss'

export default function CardDetail({ info, page }) {
  return (
    <div className="grandWrapper">
      <div className="wrapper">
        {info.map((each) => (
          <Card sx={{ minWidth: 275 }} className="child">
            <CardContent className="grow">
              {each.title.length > 0 && (
                <>
                  <Typography variant="h5">{each.title}</Typography>
                  <Divider />
                </>
              )}
              {each.location.city.length > 0 && (
                <>
                  <Typography>{each.location.city}</Typography>
                  <Divider />
                </>
              )}
              {each.career_level.length > 0 && (
                <>
                  <Typography>{each.career_level}</Typography>
                  <Divider />
                </>
              )}
              <div>
                {each?.industry?.map((item, i) => (
                  <div key={i + item}>
                    <Typography variant="body2">{item + ','}</Typography>
                  </div>
                ))}
                {each?.skills?.map((item, i) => (
                  <div key={i + item}>
                    <Typography variant="body2">{item + ','}</Typography>
                  </div>
                ))}
                {each?.languages?.map((item, i, all) => (
                  <div key={i + item}>
                    {i + 1 === all.length ? (
                      <Typography variant="body2">
                        {Object.keys(item)}
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        {Object.keys(item) + ','}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardActions>
              <Button size="small" variant="outlined">
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  )
}
