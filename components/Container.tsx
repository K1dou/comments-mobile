import { SafeAreaView } from 'react-native';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container = ({ className, children }: ContainerProps) => {
    return <SafeAreaView className={`styles.container ${className}`}>{children}</SafeAreaView>;
};

const styles = {
    container: 'flex flex-1 m-6',
};
