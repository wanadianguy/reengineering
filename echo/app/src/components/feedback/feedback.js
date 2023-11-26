import './feedback.css';

function Feedback({feedback}) {

  return (<div className={'feedback'}>
      <div>
        <span className={'mark'}> Mark : {feedback.mark}/5 </span>
      </div>
      <div className={'comment'}>
        {feedback.comment}
      </div>
    </div>)
}

export default Feedback;
