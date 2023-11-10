function Input(props) {
  function handleChangeValue(event) {
    props.handleChangeValue(props.property, event.target.value)
  }

  return (
    <>
      {
        (() => {
          if (props.type === 'number')
            return <input type={props.type} value={props.value} placeholder={props.placeholder} min={props.min}
                          max={props.max} onChange={handleChangeValue}/>
          if (props.type === 'textarea')
            return <textarea value={props.value} placeholder={props.placeholder} rows={10} cols={100}
                             onChange={handleChangeValue}/>
          else
            return <input type={props.type} value={props.value} placeholder={props.placeholder}
                          onChange={handleChangeValue}/>
        })()
      }
    </>
  )
}

export default Input;