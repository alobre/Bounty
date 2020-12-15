import { View } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import TaskCard from './TaskCard'

const RecomendedTasks = () => {

    const description = 'Hallo! Ich hätte gerne: 4 Bananen, 6er Pack Wasser (prickelnd), Gouda, Salami'

    return(

        <View>
        <ScrollView>
        <TaskCard username="alobre" title="Kleiner Einkauf" category="Einkauf" description={description} wage="5€"></TaskCard>
        <TaskCard username="alobre" title="Kleiner Einkauf" category="Einkauf" description={description} wage="5€"></TaskCard>
        <TaskCard username="alobre" title="Kleiner Einkauf" category="Einkauf" description={description} wage="5€"></TaskCard>
        <TaskCard username="alobre" title="Kleiner Einkauf" category="Einkauf" description={description} wage="5€"></TaskCard>
        </ScrollView>
        </View>
    )
}

export default RecomendedTasks;