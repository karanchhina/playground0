
const Layout = ({ children }) => {
    return (
        <main className="flex-1 overflow-y-auto p-8">
            {children}
        </main>
    );
};

export default Layout;