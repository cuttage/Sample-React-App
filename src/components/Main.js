import CardDetail from './CardDetail'
const Main = (props) => {
  return (
    <>
      <CardDetail
        info={props.info}
        page={props.page}
        loading={props.loading}
      ></CardDetail>
    </>
  )
}

export default Main
