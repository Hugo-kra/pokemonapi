import "../sass/Card.scss"

const Card = ({name, img}) => {
  return (
    <div className="card">
        <p className="card_name">{name}</p>
        <div className="card_circle"></div>
        <img className="card_imag" src={img} alt="pokemos img" />

    </div>
  )
}

export { Card}

