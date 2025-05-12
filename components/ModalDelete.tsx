import { Image } from 'react-native';
import { AlertDialog, Button, XStack, YStack, Text } from 'tamagui';

interface ModalDeleteProps {
    onDelete: () => void;
}

export default function ModalDelete({ onDelete }: ModalDeleteProps) {
    return (
        <AlertDialog native>
            <AlertDialog.Trigger asChild>
                <Button backgroundColor="white" flexDirection="row" alignItems="center" >
                    <Image source={require('../assets/icon-delete.png')} style={{ width: 12, height: 12 }} />
                    <Text fontWeight="700" color="#ED6468">
                        Delete
                    </Text>
                </Button>
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
                <AlertDialog.Overlay
                    key="overlay"
                    opacity={0.5}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
                <AlertDialog.Content
                    bordered
                    elevate
                    key="content"
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    x={0}
                    y={0}
                    scale={1}
                    opacity={1}
                >
                    <YStack gap="$4">
                        <AlertDialog.Title>Delete comment</AlertDialog.Title>
                        <AlertDialog.Description>
                            Are you sure you want to delete this comment? This will remove the comment and can't be undone.
                        </AlertDialog.Description>

                        <XStack gap="$3" justifyContent="center">
                            <AlertDialog.Cancel>
                                <Button size="$5" backgroundColor="gray" color="white" width={150}>
                                    NO, Cancel
                                </Button>
                            </AlertDialog.Cancel>

                            <AlertDialog.Action onPress={() => {
                                console.log('✅ Delete clicked');
                                onDelete();
                            }}>
                                <Button size="$5" backgroundColor="$pink4" color="white" width={150}>
                                    Yes, Delete
                                </Button>
                            </AlertDialog.Action>
                        </XStack>
                    </YStack>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>
    );
}
