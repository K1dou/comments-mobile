import CommentThread from '@/components/CommentThread';
import FieldAddComent from '@/components/FieldAddComent';
import Navbar from '@/components/NavBar';
import { useInfiniteComments } from '@/hooks/useInfiniteComments';
import { useRef } from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function HomeScreen() {


  const {
    data: paginatedCommentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteComments();

  const comments = paginatedCommentsData?.pages.flatMap((page) => page.content) ?? [];

  const scrollRef = useRef(null);


  return (
    <>
      <Navbar />
      <SafeAreaView edges={['bottom']} className="flex-1 bg-gray-100">

        <KeyboardAwareScrollView
          // innerRef={(ref) => (scrollRef.current = ref)}
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          enableResetScrollToCoords={false}
          keyboardOpeningTime={500}

          className="px-4 pt-4"
        >
          {comments.map((comment: any) => (
            <CommentThread key={comment.id} comment={comment} scrollRef={scrollRef} />
          ))}

          {hasNextPage && (
            <View className="flex items-center mt-6">
              <TouchableOpacity
                onPress={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2 bg-[#5758AB] rounded-md disabled:opacity-50"
              >
                <Text className="text-white font-semibold">
                  {isFetchingNextPage ? 'Carregando...' : 'Carregar mais comentários'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <FieldAddComent className="mt-5" scrollRef={scrollRef} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );

}
