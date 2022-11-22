import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { SocialIcon } from 'react-social-icons'

const JobDetails = ({ info, open }) => {
  console.log(info)
  const postedDate = Date.parse(info.posted_at.split(' ')[0])
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const langProficiency = (proficiency) => {
    console.log(proficiency, typeof proficiency)
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
  return (
    <>
      {open && (
        <Card sx={{ minWidth: 275, maxWidth: '90vw', overflowY: 'auto' }}>
          <CardContent className="grow" sx={{ padding: 0, margin: 0 }}>
            <div className="modalstyle">
              <div className="modalstylechild">
                <div className="flexbox">
                  <div className="infos">{info.title}</div>
                  {info?.job_type.length > 0 && (
                    <Chip sx={{ maxWidth: '100px' }} label={info.job_type} />
                  )}
                </div>
                <div className="normaltext">Posted on {date}</div>
                <div className="titletext">Description</div>
                {info.description?.length > 0 && (
                  <div
                    className="normaltext"
                    dangerouslySetInnerHTML={{ __html: info.description }}
                  ></div>
                )}
                <div className="titletext">Requirements</div>
                {info.requirements?.length > 0 && (
                  <div
                    className="normaltext"
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
                        <div>
                          {info?.salary?.min} - {info?.salary?.max}
                        </div>
                      </div>
                      <div className="flexbox3">
                        <div className="smalltexttitle">Industry:</div>
                        {info?.industry?.map((x, i, z) => (
                          <div key={i + x} className="flexbox flexboxaligned">
                            {i + 1 === z.length ? (
                              <div>{x}</div>
                            ) : (
                              <div>{x}, </div>
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
                              <div>{x} </div>
                            ) : (
                              <div>{x}, </div>
                            )}
                            <div style={{ paddingLeft: '2px' }}>
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
                              <div>{x}</div>
                            ) : (
                              <div>{x}, </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flexbox3">
                        <div className="smalltexttitle">Career Level:</div>
                        {info?.career_level?.map((x, i, z) => (
                          <div key={i + x} className="flexbox flexboxaligned">
                            {i + 1 === z.length ? (
                              <div>{x}</div>
                            ) : (
                              <div>{x}, </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flexbox3">
                        <div className="smalltexttitle">Minimum GPA:</div>
                        <div>{info.gpa}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="titletext">Required Skills</div>
                <div className="flexbox2">
                  {info?.skills?.map((x, i) => (
                    <div key={i + x} className="itemflex2">
                      <Chip sx={{ maxWidth: '100px' }} label={x} />
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
                          sx={{ maxWidth: '200px' }}
                          label={`${Object.keys(x)} -
                            ${langProficiency(Object.values(x)[0])}`}
                        />
                      ) : (
                        <Chip
                          sx={{ maxWidth: '200px' }}
                          label={`${Object.keys(x)} -
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
                      url="https://www.facebook.com/"
                    ></SocialIcon>
                    <SocialIcon
                      className="flexstretch"
                      url="https://twitter.com/"
                    ></SocialIcon>
                    <SocialIcon
                      className="flexstretch"
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
      )}
    </>
  )
}

export default JobDetails
