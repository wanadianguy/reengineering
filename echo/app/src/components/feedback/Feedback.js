import './Feedback.css'

function Feedback({feedback}) {

  return (<div className={'Feedback'}>
      <div>
        <span className={'Mark'}> Mark : {feedback.mark}/5 </span>
      </div>
      <div className={'Comment'}>
        {feedback.comment}
      </div>
    </div>)
}

export default Feedback;