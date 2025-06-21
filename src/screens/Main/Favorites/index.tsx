import {ScheduleEntry, ScheduleShort} from '@/components/custom/ScheduleEntry';
import {useFavorites} from '@/hooks/useFavorites';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Empty} from './components/Empty';
import {useStyles} from './styles';

export const FavoritesScreen = () => {
  const styles = useStyles();
  const {favorites, fetchNextPage} = useFavorites();

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<ScheduleShort>) => (
      <ScheduleEntry
        item={item}
        withMargin
        isLast={index === (favorites?.length ?? 1) - 1}
      />
    ),
    [favorites],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlashList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={fetchNextPage}
        showsVerticalScrollIndicator={false}
        bounces={false}
        estimatedItemSize={121}
        ListEmptyComponent={Empty}
      />
    </SafeAreaView>
  );
};
