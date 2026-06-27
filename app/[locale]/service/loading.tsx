// app/[locale]/service/loading.tsx
import PerLoading from "@/components/UI/Muscles/PreLoading/PreLoading";

export default function Loading() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#191b1f',
        }}>
            <PerLoading size="xl" />
        </div>
    );
}