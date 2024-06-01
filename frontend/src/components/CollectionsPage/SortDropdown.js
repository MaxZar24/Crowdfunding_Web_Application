import React, {useState} from 'react';

export default function SortDropdown({onSortChange}) {
    const [sortOption, setSortOption] = useState('');

    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);
        onSortChange(selectedOption);
    };

    return (
        <div className="sort-menu">
            <div className="sort-background">
                <label htmlFor="sort">Сортувати за:</label>
                <select className="sort-select" id="sort" value={sortOption} onChange={handleSortChange}>
                    <option value="">Виберіть...</option>
                    <option value="date-old">за датою (від найстаріших)</option>
                    <option value="date-new">за датою (від найновіших)</option>
                    <option value="amount_needed_low">за коштами (найменше залишилось)</option>
                    <option value="amount_needed_huge">за коштами (найбільше залишилось)</option>
                </select>
            </div>
        </div>
    );
}