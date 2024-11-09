import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const Input = (props) => { 
     const borderColor = props.isError ? 'red' : theme.colors.text;
   const colorPlaceHolder= props.isError ?'red' :  theme.colors.textLight
    return (
        <View style={[styles.container, props.containerStyle && props.containerStyle, { borderColor }]}>
            {props.icon && props.icon}
            <TextInput 
                style={{ flex: 1 }}
                placeholderTextColor={colorPlaceHolder}
                ref={props.inputRef && props.inputRef}
                {...props}
            />
           {props.isPassword && props.eyesIcon}

        </View>
    );
};

export default Input;  

const styles = StyleSheet.create({ 
    container: { 
        flexDirection: 'row',
        height: hp(7.2),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.4,
        borderRadius: theme.radius.xxl,
        borderCurve: 'continuous',
        paddingHorizontal: 18,
        gap: 12
    }
});
