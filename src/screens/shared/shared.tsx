import {AppText} from '@/components/common';
import {useGetUserSharesQuery} from '@/services/share';
import React, {useCallback} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import ShareItem from './components/ShareItem';

const SharedScreen = () => {
  const {fetchNextPage, isFetchingNextPage, data, hasNextPage, isLoading} =
    useGetUserSharesQuery();

  const shares = data?.pages.flatMap(page => page.data) || [];

  const onEndReached = useCallback(() => {
    if (isFetchingNextPage || isLoading) {
      return;
    }
    console.log('onEndReached');
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

  return (
    <View>
      <FlatList
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <AppText align="center">Không có dữ liệu</AppText>
          )
        }
        data={shares}
        renderItem={({item}) => <ShareItem share={item} />}
        keyExtractor={item => item._id!}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </View>
  );
};

export default SharedScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    gap: 8,
  },
});
