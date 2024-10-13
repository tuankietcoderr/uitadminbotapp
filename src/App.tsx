import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {ClickOutsideProvider} from 'react-native-click-outside';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ChatContextProvider} from './context';
import ApplicationNavigator from './navigators/application';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

const App = () => {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <ClickOutsideProvider>
            <ChatContextProvider>
              <ApplicationNavigator />
              <StatusBar
                translucent
                barStyle={'dark-content'}
                backgroundColor={'transparent'}
              />
            </ChatContextProvider>
          </ClickOutsideProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
