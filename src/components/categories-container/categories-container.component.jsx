import CategoryContainer from '../category-container/category-container.component';

import './categories-container.styles.scss';

const CategoriesContainer = ({ categories }) => {
return (
        <div className='categories-container'>
            {categories.map((category) => (
                <CategoryContainer key={category.id} category={category}/>
            ))}
        </div>
    )
}

export default CategoriesContainer;