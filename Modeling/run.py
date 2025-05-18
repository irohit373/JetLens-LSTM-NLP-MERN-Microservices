from app import app, logger
import os
import sys
import socket

def check_port_available(port):
    """Check if a port is available"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(('127.0.0.1', port))
            return True
        except OSError:
            return False

if __name__ == "__main__":
    try:
        port = int(os.environ.get("PORT", 5000))
        
        # Check if port is available
        if not check_port_available(port):
            logger.warning(f"Port {port} is already in use. Trying port 5001")
            port = 5001
            if not check_port_available(port):
                logger.error(f"Port {port} is also in use. Please free up a port or specify a different one.")
                print(f"ERROR: Port {port} is also in use. Please free up a port or specify a different one.")
                sys.exit(1)
        
        # Print helpful server URLs to console
        print(f"\n====== JetLens Price Prediction API ======")
        print(f"Local:   http://127.0.0.1:{port}")
        print(f"Network: http://[your-IP]:{port}")
        print(f"API endpoint: http://127.0.0.1:{port}/api/predict")
        print(f"Logs viewer: http://127.0.0.1:{port}/logs")
        print(f"=========================================\n")
        
        logger.info(f"Starting server on port {port}")
        app.run(host='0.0.0.0', port=port, debug=True)
    except Exception as e:
        logger.error(f"Error starting Flask server: {e}")
        sys.exit(1)