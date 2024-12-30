export const HandleErrors = (error, context) => {
    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction) {
        console.error(error, context);
    }
    return {
        error: true,
        message: isProduction ? "An unexpected error occurred, please try again." : error.message,
        details: isProduction ? undefined : error.stack
    };
}