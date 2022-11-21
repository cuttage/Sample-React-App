import CardDetail from './CardDetail'
const Main = (props) => {
  return (
    <>
      <div>
        {props.page} {props.info.length}
      </div>
      <CardDetail info={props.info} page={props.page}></CardDetail>
    </>
  )
}

export default Main
