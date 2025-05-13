import CommentThread from '@/components/CommentThread';
import FieldAddComent from '@/components/FieldAddComent';
import Navbar from '@/components/NavBar';
import { useInfiniteComments } from '@/hooks/useInfiniteComments';
import { useRef } from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default function HomeScreen() {


  const {
    data: paginatedCommentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteComments();

  const comments = paginatedCommentsData?.pages.flatMap((page) => page.content) ?? [];

  const scrollRef = useRef<KeyboardAwareScrollView>(null);


  return (
    <View className="flex-1 bg-gray-100">
      <Navbar />

      <KeyboardAwareScrollView
        ref={scrollRef}
        enableOnAndroid
        contentContainerStyle={{ paddingBottom: 20 }}
        className="px-4 pt-4"
      >

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

        <FieldAddComent className="mt-5" scrollRef={scrollRef} />
      </KeyboardAwareScrollView>
    </View>
  );
}
