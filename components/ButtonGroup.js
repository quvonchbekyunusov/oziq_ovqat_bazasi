import React from 'react'
import { t } from 'react-native-tailwindcss';
import { View, Text, TouchableOpacity } from 'react-native'

const ButtonGroup = ({title1, title2, title3, title4, onClickHandler1, onClickHandler2, onClickHandler3, onClickHandler4}) => {
    return (
        <View>
        <TouchableOpacity
            onPress={onClickHandler1}
            style={[
                    t.wFull, 
                    t.h10, 
                    t.rounded, 
                    t.bgGray100, 
                    t.mY1]}>
                <Text style={[
                    t.textCenter, 
                    t.mT2,
                    { fontSize: 14, 
                    fontFamily:'Golos', 
                    color: "#5B5B5B"}]}>
                        {title1}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={onClickHandler2}
            style={[
                t.wFull, 
                t.h10, 
                t.rounded, 
                t.bgGray100, 
                t.mY1]}>
                <Text 
                style={[
                    t.textCenter, 
                    t.mT2,
                    { fontSize: 14, 
                    fontFamily:'Golos', 
                    color: "#5B5B5B"}]}>
                    {title2}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={onClickHandler3}
            style={[
                t.wFull, 
                t.h10, 
                t.rounded, 
                t.bgGray100, 
                t.mY1
            ]}>
                <Text 
                style={[
                    t.textCenter, 
                    t.mT2,
                    { fontSize: 14, 
                    fontFamily:'Golos', 
                    color: "#5B5B5B"}]}>
                    {title3}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={onClickHandler4}
            style={[
                t.wFull, 
                t.h10, 
                t.rounded, 
                t.bgGray100, 
                t.mY1]}>
                <Text 
                style={[
                    t.textCenter, 
                    t.mT2,
                    { fontSize: 14, 
                    fontFamily:'Golos', 
                        color: "#5B5B5B"}]}>
                    {title4}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonGroup;