import searchPageImage from '@assets/search-page.png';
import { AvailableTimeCard } from '@components/AvailableTimeCard';
import { Flex } from '@components/Flex';
import { Input } from '@components/Forms/Input';
import { UserLocation } from '@components/UserLocation';
import { VStack } from '@components/VStack';
import { FlatList, Image } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSearch } from './useSearch';
import { Loading } from '@components/Loading';

const ALT_SEARCH_PAGE_IMG = 'Imagem de pessoas com lupa na mão';

export function Search() {
  const { searchValue, setSearchValue, arenas, loading } = useSearch();

  const renderListOrEmptyState = () => (
    <Flex align='center' flex={1}>
      {searchValue.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: 16, gap: 16 }}
          data={arenas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AvailableTimeCard
              id={item.id}
              name={item.name}
              image={`https://ui-avatars.com/api/?name=${item.name}`}
              height={80}
              width='100%'
            />
          )}
          style={{ width: '100%', flex: 1 }}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <>
          <Image
            source={searchPageImage}
            alt={ALT_SEARCH_PAGE_IMG}
            style={{
              width: 244,
              resizeMode: 'contain',
            }}
          />
          <Text
            variant='bodyMediumBold'
            style={{
              textAlign: 'center',
            }}
          >
            Encontre sua arena favorita
          </Text>
        </>
      )}
    </Flex>
  );

  return (
    <Flex flex={1}>
      <VStack flex={1}>
        <UserLocation />
        <VStack
          style={{
            paddingHorizontal: 24,
            paddingTop: 16,
            flex: 1,
          }}
        >
          <Input
            defHeight={false}
            left={<TextInput.Icon icon='magnify' />}
            placeholder='Buscar arena'
            onChangeText={setSearchValue}
            value={searchValue}
          />

          {loading ? <Loading /> : renderListOrEmptyState()}
        </VStack>
      </VStack>
    </Flex>
  );
}
