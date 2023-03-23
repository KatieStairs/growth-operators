// Header for slides with the logo and a title

function SlideHeader ({title}) {
  return (
    <>
    <div className="header-div">
      <div className="header-title-div">
        <h3 className="header-h1">{title}</h3>
      </div>
      <div className="header-logo-div">
        <img src={require('../../../../images/Growth_Operators_Logo_CMYK.png')} className="slide-header-logo"/>
      </div>
    </div>
    <hr className="header-divider"></hr>
    </>
  )
}

export default SlideHeader;