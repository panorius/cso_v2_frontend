const LoginPage = () => {
    return (
        <div className="mb-10 max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Tabs */}
                <div className="flex bg-orange-cso">
                    <button className="flex-1 py-3 text-white font-semibold hover:bg-orange-cso/90 transition-colors">
                        Sign in
                    </button>
                    <button className="flex-1 py-3 text-white/80 font-semibold hover:bg-orange-cso/90 transition-colors">
                        Sign up
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Social Auth Buttons */}
                    <div className="flex justify-center gap-3 mb-6">
                        <button className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                            <span className="text-sm font-bold">G</span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                            <span className="text-sm font-bold">f</span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors">
                            <span className="text-sm font-bold">𝕏</span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                            <span className="text-sm font-bold">D</span>
                        </button>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email/Username
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                maxLength="100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-cso focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                maxLength="100"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-cso focus:border-transparent"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-cso text-white py-2 px-4 rounded-md hover:bg-orange-cso/90 transition-colors font-semibold"
                        >
                            Connect
                        </button>

                        <div className="text-center text-sm text-gray-600">
                            <a
                                href="#"
                                className="hover:text-orange-cso transition-colors"
                            >
                                Forgotten password?
                            </a>
                            <span className="mx-2">|</span>
                            <a
                                href="#"
                                className="hover:text-orange-cso transition-colors"
                            >
                                First visit? Sign up
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
