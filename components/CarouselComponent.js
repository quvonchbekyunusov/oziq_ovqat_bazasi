import React from 'react'
import { View, Dimensions, StyleSheet } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Chart from './Chart'

const CarouselComponent = ({graph}) => {
  const isCarousel = React.useRef(null)
  const [index, setIndex] = React.useState(0)
  const data= (graph.sumGraph !== undefined && graph.amountGraph !==undefined) ?
 [{
    labels: [graph.sumGraph[0].day, graph.sumGraph[1].day, graph.sumGraph[2].day, graph.sumGraph[3].day, graph.sumGraph[4].day, graph.sumGraph[5].day, graph.sumGraph[6].day],
    label: 'Сумма продаж',
    label2: 'Тысяча сумов',
    datasets: [
      {
        strokeWidth: 2,
        data: [
          graph.sumGraph[0].sum === 0 ? graph.sumGraph[0].sum : graph.sumGraph[0].sum/1000,
          graph.sumGraph[1].sum === 0 ? graph.sumGraph[1].sum : graph.sumGraph[1].sum/1000,
          graph.sumGraph[2].sum === 0 ? graph.sumGraph[2].sum : graph.sumGraph[2].sum/1000,
          graph.sumGraph[3].sum === 0 ? graph.sumGraph[3].sum : graph.sumGraph[3].sum/1000,
          graph.sumGraph[4].sum === 0 ? graph.sumGraph[4].sum : graph.sumGraph[4].sum/1000,
          graph.sumGraph[5].sum === 0 ? graph.sumGraph[5].sum : graph.sumGraph[5].sum/1000,
          graph.sumGraph[6].sum === 0 ? graph.sumGraph[6].sum : graph.sumGraph[6].sum/1000,
        ]
      }
    ]
  },
  {
    labels: [graph.amountGraph[0].day, graph.amountGraph[1].day, graph.amountGraph[2].day, graph.amountGraph[3].day, graph.amountGraph[4].day, graph.amountGraph[5].day, graph.amountGraph[6].day],
    label: 'Kоличество продаж',
    label2: '',
    datasets: [
      {
      strokeWidth: 2,
      data: [
          graph.amountGraph[0].amount,
          graph.amountGraph[1].amount,
          graph.amountGraph[2].amount,
          graph.amountGraph[3].amount,
          graph.amountGraph[4].amount,
          graph.amountGraph[5].amount,
          graph.amountGraph[6].amount,
        ]
      }
    ],
  }] : []
  return (
    <View>
      <Carousel
        layout={'default'}
        layoutCardOffset={9}
        onSnapToItem={(index) => setIndex(index)}
        ref={isCarousel}
        data={data}
        renderItem={Chart}
        sliderWidth={Dimensions.get('window').width - 32}
        itemWidth={Dimensions.get('window').width - 32}
        inactiveSlideShift={0}
        useScrollView={true}
        containerCustomStyle={{
        borderRadius: 15,
        backgroundColor: '#fff',
        marginTop: 20,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.01,
        shadowRadius: 2,
        elevation: 5,}}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 20,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: '#2323C8'
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  )
}


export default CarouselComponent