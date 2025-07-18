import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div style={{ position: "fixed", top: 20, right: 20 }}>
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        style={{
                            marginBottom: "10px",
                            padding: "10px 15px",
                            color: "white",
                            borderRadius: "5px",
                            background:
                                t.type === "success"
                                    ? "green"
                                    : t.type === "error"
                                        ? "red"
                                        : "blue",
                        }}
                    >
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
