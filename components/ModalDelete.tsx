import { AlertDialog, Button, XStack, YStack } from 'tamagui'


interface ModalDeleteProps {
    onDelete: () => void;
}

export default function ModalDelete({ onDelete }: ModalDeleteProps) {

    return (
        <>
            <AlertDialog native>
                <AlertDialog.Trigger asChild>
                    <Button className="text-pink-400 font-bold text-[16px]">
                        <img src="icon-delete.png" className="w-3 h-3" />
                        Delete
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
                                <AlertDialog.Cancel asChild>
                                    <Button size="$5" className="uppercase bg-gray-500 text-white w-[150px]">
                                        NO, Cancel
                                    </Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action asChild>
                                    <Button
                                        size="$5"
                                        className="uppercase bg-pink-400 text-white w-[150px]"
                                        onPress={onDelete}
                                    >
                                        Yes, Delete
                                    </Button>
                                </AlertDialog.Action>
                            </XStack>
                        </YStack>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog>




        </>
    )
}