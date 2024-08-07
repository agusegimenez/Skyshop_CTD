import customCss from "./Category.module.css"

export default function Category({category}) {

    const { image, name, id} = category;

  return (
    <article id={id} className={customCss.catArticle}>
        <div className={customCss.imageDiv}>
            <img src={image} alt={name}/>
        </div>
        <h4>{name}</h4>
    </article>
  )
}