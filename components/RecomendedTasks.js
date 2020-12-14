import React from 'react';
import TaskCard from './TaskCard'

const RecomendedTasks = () => {

    const description = 'Hallo! Ich hätte gerne: 4 Bananen, 6er Pack Wasser (prickelnd), Gouda, Salami'

    return(
        <TaskCard username="alobre" title="Kleiner Einkauf" category="Einkauf" description={description} wage="5€"/>
    )
}

export default RecomendedTasks;