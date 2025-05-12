import CommentThread from '@/components/CommentThread';
import FieldAddComent from '@/components/FieldAddComent';
import Navbar from '@/components/NavBar';
import { useInfiniteComments } from '@/hooks/useInfiniteComments';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {


  const {
    data: paginatedCommentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteComments();

  const comments = paginatedCommentsData?.pages.flatMap((page) => page.content) ?? [];

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header fixo */}
      <Navbar />

      {/* Conteúdo rolável */}
      <ScrollView className="flex-1 px-4 pt-4 pb-20">
        {comments.map((comment: any) => (
          <CommentThread key={comment.id} comment={comment} />
        ))}

        {hasNextPage && (
          <View className="flex items-center mt-6">
            <TouchableOpacity
              onPress={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-4 py-2 bg-blue-600 rounded-md disabled:opacity-50"
            >
              <Text className="text-white font-semibold">
                {isFetchingNextPage ? 'Carregando...' : 'Carregar mais comentários'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <FieldAddComent className="mt-4" />
      </ScrollView>
    </View>
  );
}
