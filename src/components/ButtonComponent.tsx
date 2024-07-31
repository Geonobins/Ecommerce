

const ButtonComponent = (props:any) => {
  return (
    <div>
      <button
          className={`px-3 py-1 rounded-lg ${props.bg}  hover:bg-blue-100  ${props.cl}`}>
          {props.value}
        </button>
    </div>
  )
}

export default ButtonComponent
