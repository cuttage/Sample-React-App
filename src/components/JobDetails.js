import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { SocialIcon } from 'react-social-icons'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

const JobDetails = ({ info, open, cardsOnPage, cardClick }) => {
  const { t } = useTranslation()
  const postedDate = Date.parse(info.posted_at.split(' ')[0])
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  //support for strings could be implemented but it is a best practice to send consistent data from the backend, so we will handle only numbers
  const langProficiency = (proficiency) => {
    switch (proficiency) {
      case 1:
        return `${t('beginner')}`
      case 2:
        return `${t('pre-intermediate')}`
      case 3:
        return `${t('intermediate')}`
      case 4:
        return `${t('fluent')}`
      case 5:
        return `${t('full professional proficiency')}`
      default:
        return `${t('n/a')}`
    }
  }
  //for the purpose of showcasing we didn't but internationalization support should be added to the code below.
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
                  <div className="normaltext">
                    {t('posted on')} {date}
                  </div>
                  <div className="titletext">{t('description')}</div>
                  {info.description?.length > 0 && (
                    <div
                      className="normaltext innerh"
                      dangerouslySetInnerHTML={{ __html: info.description }}
                    ></div>
                  )}
                  <div className="titletext">{t('requirements')}</div>
                  {info.requirements?.length > 0 && (
                    <div
                      className="normaltext innerh"
                      dangerouslySetInnerHTML={{ __html: info.requirements }}
                    ></div>
                  )}
                  <div className="titletext">{t('summary')}</div>
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
                          <div className="smalltexttitle">
                            {t('salary range')}:
                          </div>
                          <div className="smalltexttext">
                            {info?.salary?.min} - {info?.salary?.max}
                          </div>
                        </div>
                        <div className="flexbox3">
                          <div className="smalltexttitle">{t('industry')}:</div>
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
                            {t('experience required')}:
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
                                {t('year(s) minimum')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flexboxparentin">
                        <div className="flexbox3">
                          <div className="smalltexttitle">{t('major')}:</div>
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
                          <div className="smalltexttitle">
                            {t('career level')}:
                          </div>
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
                          <div className="smalltexttitle">
                            {t('minimum GPA')}:
                          </div>
                          <div className="smalltexttext">{info.gpa}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="titletext">{t('required skills')}</div>
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
                  <div className="titletext">{t('languages')}</div>
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
                      <div className="titletext">{t('share')}</div>
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
                        {t('apply')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="bottomsideparent cardvisible">
            <div className="bottomside">
              {cardsOnPage.map((x, i) => (
                <Card
                  sx={{ width: 274, margin: '16px' }}
                  classes={{ root: 'cardclasscarousel' }}
                  onClick={(event) => cardClick(x)}
                  key={x?.title + i}
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
          <div className="nomessage">{t('please resize the screen')}.</div>
        </div>
      )}
    </>
  )
}

export default JobDetails
