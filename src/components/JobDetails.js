import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { SocialIcon } from 'react-social-icons'
import Typography from '@mui/material/Typography'

const JobDetails = ({ info, open, cardsOnPage, cardClick }) => {
  const postedDate = Date.parse(info.posted_at.split(' ')[0])
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const langProficiency = (proficiency) => {
    switch (proficiency) {
      case 1:
        return 'Beginner'
      case 2:
        return 'Pre-intermediate'
      case 3:
        return 'Intermediate'
      case 4:
        return 'Fluent'
      case 5:
        return 'Full professional proficiency'
      default:
        return 'N/A'
    }
  }
  const date = new Intl.DateTimeFormat('en-US', options).format(postedDate)
  const capitalize = (str) => {
    if (typeof str === 'string') {
      let strings = str
        .split(' ')
        .map((z) => z.charAt(0).toUpperCase() + z.slice(1))
      return strings.join(' ')
    } else {
      return str
    }
  }
  return (
    <>
      {open && (
        <div className="grandwrapper">
          <Card
            sx={{ minWidth: 275, maxWidth: '90vw', overflowY: 'auto' }}
            classes={{ root: 'cardvisible' }}
          >
            <CardContent className="grow" sx={{ padding: 0, margin: 0 }}>
              <div className="modalstyle">
                <div className="modalstylechild">
                  <div className="flexbox">
                    <div className="infos">{capitalize(info.title)}</div>
                    {info?.job_type.length > 0 && (
                      <Chip
                        sx={{ maxWidth: '100px' }}
                        label={capitalize(info.job_type)}
                      />
                    )}
                  </div>
                  <div className="normaltext">Posted on {date}</div>
                  <div className="titletext">Description</div>
                  {info.description?.length > 0 && (
                    <div
                      className="normaltext innerh"
                      dangerouslySetInnerHTML={{ __html: info.description }}
                    ></div>
                  )}
                  <div className="titletext">Requirements</div>
                  {info.requirements?.length > 0 && (
                    <div
                      className="normaltext innerh"
                      dangerouslySetInnerHTML={{ __html: info.requirements }}
                    ></div>
                  )}
                  <div className="titletext">Summary</div>
                  <Card
                    sx={{ height: 'auto', padding: 0 }}
                    classes={{
                      root: 'cardparentw',
                    }}
                  >
                    <CardContent
                      classes={{
                        root: 'cardbox',
                      }}
                    >
                      <div className="flexboxparentin">
                        <div className="flexbox3">
                          <div className="smalltexttitle">Salary Range:</div>
                          <div className="smalltexttext">
                            {info?.salary?.min} - {info?.salary?.max}
                          </div>
                        </div>
                        <div className="flexbox3">
                          <div className="smalltexttitle">Industry:</div>
                          {info?.industry?.map((x, i, z) => (
                            <div key={i + x} className="flexbox flexboxaligned">
                              {i + 1 === z.length ? (
                                <div className="smalltexttext">
                                  {capitalize(x)}
                                </div>
                              ) : (
                                <div className="smalltexttext">
                                  {capitalize(x)},{' '}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flexbox3">
                          <div className="smalltexttitle">
                            Experience Required:
                          </div>
                          {info?.years_of_experience?.map((x, i, z) => (
                            <div key={i + x} className="flexbox flexboxaligned">
                              {i + 1 === z.length ? (
                                <div className="smalltexttext">
                                  {capitalize(x)}{' '}
                                </div>
                              ) : (
                                <div className="smalltexttext">
                                  {capitalize(x)},{' '}
                                </div>
                              )}
                              <div
                                className="smalltexttext"
                                style={{ paddingLeft: '2px' }}
                              >
                                year(s) minimum
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flexboxparentin">
                        <div className="flexbox3">
                          <div className="smalltexttitle">Major:</div>
                          {info?.major?.map((x, i, z) => (
                            <div key={i + x} className="flexbox flexboxaligned">
                              {i + 1 === z.length ? (
                                <div className="smalltexttext">
                                  {capitalize(x)}
                                </div>
                              ) : (
                                <div className="smalltexttext">
                                  {capitalize(x)},{' '}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flexbox3">
                          <div className="smalltexttitle">Career Level:</div>
                          {info?.career_level?.map((x, i, z) => (
                            <div key={i + x} className="flexbox flexboxaligned">
                              {i + 1 === z.length ? (
                                <div className="smalltexttext">
                                  {capitalize(x)}
                                </div>
                              ) : (
                                <div className="smalltexttext">
                                  {capitalize(x)},{' '}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flexbox3">
                          <div className="smalltexttitle">Minimum GPA:</div>
                          <div className="smalltexttext">{info.gpa}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="titletext">Required Skills</div>
                  <div className="flexbox2">
                    {info?.skills?.map((x, i) => (
                      <div key={i + x} className="itemflex2">
                        <Chip
                          sx={{ maxWidth: '100px' }}
                          label={capitalize(x)}
                        />
                      </div>
                    ))}
                  </div>
                  <Divider light sx={{ marginTop: '16px' }} />
                  <div className="titletext">Languages</div>
                  <div className="flexbox2">
                    {info?.languages?.map((x, i, z) => (
                      <div key={i + x} className="itemflex2">
                        {i + 1 === z.length ? (
                          <Chip
                            sx={{ maxWidth: '250px' }}
                            label={`${Object.keys(x).toString().toUpperCase()} -
                            ${langProficiency(Object.values(x)[0])}`}
                          />
                        ) : (
                          <Chip
                            sx={{ maxWidth: '250px' }}
                            label={`${Object.keys(x).toString().toUpperCase()} -
                            ${langProficiency(Object.values(x)[0])}`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <Divider light sx={{ marginTop: '16px' }} />
                  <div className="flexboxparentin2">
                    <div className="flexbox">
                      <div className="titletext">Share</div>
                      <SocialIcon
                        className="flexstretch"
                        style={{ height: 25, width: 25 }}
                        url="https://www.facebook.com/"
                      ></SocialIcon>
                      <SocialIcon
                        className="flexstretch"
                        style={{ height: 25, width: 25 }}
                        url="https://twitter.com/"
                      ></SocialIcon>
                      <SocialIcon
                        className="flexstretch"
                        style={{ height: 25, width: 25 }}
                        url="https://www.linkedin.com/"
                      ></SocialIcon>
                    </div>
                    <div className="flexbox">
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: 'darkblue', marginTop: '16px' }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="bottomsideparent cardvisible">
            <div className="bottomside">
              {cardsOnPage.map((x) => (
                <Card
                  sx={{ width: 274, margin: '16px' }}
                  classes={{ root: 'cardclasscarousel' }}
                  onClick={(event) => cardClick(x)}
                >
                  <CardContent>
                    <div className="titletext">
                      {x?.title?.charAt(0).toUpperCase() + x?.title?.slice(1)}
                    </div>
                    <div className="normaltext">
                      {x?.location?.city?.charAt(0).toUpperCase() +
                        x?.location?.city?.slice(1)}
                      {x?.location?.city &&
                        x?.location?.country &&
                        `, ${
                          x?.location?.country?.charAt(0).toUpperCase() +
                          x?.location?.country?.slice(1)
                        }`}
                    </div>
                    <Divider light sx={{ marginTop: '16px' }} />
                    <div className="cardlistitems cardlistitems2">
                      {x.career_level.length > 0 && (
                        <>
                          <Typography variant="body2">
                            {x.career_level}
                          </Typography>
                          <Divider />
                        </>
                      )}
                      {x?.industry?.map((item, i) => (
                        <div key={i + item}>
                          <Typography variant="body2">
                            {item.charAt(0).toUpperCase() + item.slice(1) + ','}
                          </Typography>
                        </div>
                      ))}
                      {x?.skills?.map((item, i, all) => (
                        <div key={i + item}>
                          {i + 1 === all.length ? (
                            <Typography variant="body2">
                              {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Typography>
                          ) : (
                            <Typography variant="body2">
                              {item.charAt(0).toUpperCase() +
                                item.slice(1) +
                                ','}
                            </Typography>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="nomessage">Please resize the screen.</div>
        </div>
      )}
    </>
  )
}

export default JobDetails
