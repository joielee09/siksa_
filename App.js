import { View, Text } from 'native-base';
import React from 'react';
import styled from 'styled-components/native';

const Image = styled.Image`
    width: 200px;
    height: 200px;
    justify-content: center;
`;

const App = () => {
    return(
        <View>
            <Image 
                source={{ uri:'https://thewellesleynews.com/wp-content/uploads/2020/02/Courtesy-of-Looper.jpg' }}
            />
            <Text>This is overwrite of try out</Text>
        </View>
    );
}

export default App;