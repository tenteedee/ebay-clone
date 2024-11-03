// LeftSidebar.jsx (CategoriesFilter.jsx)
import React from 'react';
import {Link} from 'react-router-dom';
import {useDataContext} from './../../context/Context.jsx';

function CategoriesFilter({primaryCategoryId, selectedCategoryId, onCategorySelect}) {
    const {primaryCategories, categories} = useDataContext();

    const primaryCategory = primaryCategories.find((category) => category.id == parseInt(primaryCategoryId));

    const filteredCategories = categories.filter((category) => category.primaryCategoryId == parseInt(primaryCategoryId));
    return (<aside className="w-1/4 p-4 border-r border-gray-300">
        {/* Display the primary category name */}
        {primaryCategory && (<h2 className="font-semibold mb-4">{primaryCategory.name}</h2>)}
        <ul>
            {filteredCategories.map((category) => (<li key={category.id}>
                <Link
                    to={`/${primaryCategoryId}/${category.id}`}
                    className={`hover:underline ${selectedCategoryId === category.id ? 'underline font-semibold' : ''}`}
                    onClick={() => onCategorySelect(category.id)}
                >
                    {category.name}
                </Link>
            </li>))}
        </ul>
    </aside>);
}

export default CategoriesFilter;