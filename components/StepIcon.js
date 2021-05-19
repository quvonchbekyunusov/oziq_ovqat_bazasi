import React, {useState, useEffect} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { t } from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/Feather';

const StepIcon = ({contractIcon, brendIcon, setStep, brendId,
  }) => {
    const [color1, setColor1] = useState('#C4C4C4');
    const [color2, setColor2] = useState('#C4C4C4');
    const [icon1, setIcon1] = useState('circle');
    const [icon2, setIcon2] = useState('circle');


    const stepChanger = (step) => {
        setStep(step)
    }

    useEffect(() => {
        if(!brendIcon) {
            setIcon1('circle')
            setColor1('#C4C4C4')
        } else {
            setIcon1('check-circle')
            setColor1('#2323C8')
        }
     }, [brendIcon])
     useEffect(() => {
        if(!contractIcon) {
            setIcon2('circle')
            setColor2('#C4C4C4')
        } else {
            setIcon2('check-circle')
            setColor2('#2323C8')
        }
     }, [contractIcon])
    
    return (
        <View>
            <Text 
            style={[
                t.textCenter, 
                {paddingVertical: 7}]}>
                <View 
                style={[t.flex, 
                t.flexRow, 
                t.alignCenter]} >
                    <TouchableOpacity onPress = {()=>stepChanger(1)}>
                    <Icon name={icon1} size={25} color={color1}/>
                    </TouchableOpacity>
                    <View
                        style={{
                            transform: [{translateY: -12}],
                            width:40,
                            borderBottomColor: {color1},
                            borderBottomWidth: 1,
                            borderStyle: 'dotted'
                        }}
                    />     
                    <TouchableOpacity
                    onPress={()=>{brendId && stepChanger(2)}}>               
                    <Icon name={icon2} size={25} color = {color2} />
                    </TouchableOpacity>
                </View>
            </Text>
        </View>
    )
}

export default StepIcon
