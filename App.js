import React, { useEffect, useState } from 'react';
import { Button, Linking, Platform, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from './aws-exports';

async function urlOpener(url, redirectUrl) {
    const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
        url,
        redirectUrl
    );

    if (type === 'success' && Platform.OS === 'ios') {
        WebBrowser.dismissBrowser();
        return Linking.openURL(newUrl);
    }
}

Amplify.configure({
    ...awsconfig,
    oauth: {
        ...awsconfig.oauth,
        urlOpener,
    },
});

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                    getUser().then((userData) => setUser(userData));
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    console.log('Sign in failure', data);
                    break;
            }
        });

        getUser().then((userData) => setUser(userData));
    }, []);

    function getUser() {
        return Auth.currentAuthenticatedUser()
            .then((userData) => userData)
            .catch(() => console.log('Not signed in'));
    }

    return (
        <View>
            <Text>User: {user ? JSON.stringify(user.attributes) : 'None'}</Text>
            {user ? (
              <View>
                <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                <Button title="Sign Out" onPress={() => Auth.signOut()} />
              </View>
            ) : (
                <Button title="Federated Sign In" onPress={() => Auth.federatedSignIn()} />
            )}
        </View>
    );
}

export default App;