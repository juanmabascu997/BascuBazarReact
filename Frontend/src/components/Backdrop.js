import './Backdrop.css';

function Backdrop({click, show}) {
  return ( show &&
    <div className='backdrop' onClick={click}>
      
    </div>
  )
}

export default Backdrop