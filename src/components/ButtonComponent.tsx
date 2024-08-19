
type ButtonComponentProps={
  bg?:string;
  cl?:string;
  value?:string;
}

const ButtonComponent = ({bg,cl,value}:ButtonComponentProps) => {
  return (
    <div>
      <button
        className={`px-3 py-1 rounded-lg ${bg}  hover:bg-blue-100  ${cl}`}>
        {value}
      </button>
    </div>
  )
}

export default ButtonComponent
