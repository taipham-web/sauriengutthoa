import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase'; // Không cần import db nữa

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Nếu có user đăng nhập, lưu thẳng thông tin user đó vào state
            setCurrentUser(user);
            setLoading(false); // Báo hiệu đã kiểm tra xong
        });

        return unsubscribe;
    }, []);

    return { currentUser, loading };
};