#!/usr/bin/env python3
"""
Simple script to run the Flask app with Gunicorn locally for testing.
Usage: python run_gunicorn.py
"""

import subprocess
import sys

def run_gunicorn():
    """Run the Flask app with Gunicorn"""
    try:
        # Run gunicorn with basic configuration
        cmd = [
            "gunicorn",
            "--bind", "0.0.0.0:8000",
            "--workers", "1",
            "--timeout", "120",
            "app:app"
        ]
        
        print("Starting Gunicorn server...")
        print("Access your app at: http://localhost:8000")
        print("Press Ctrl+C to stop the server")
        
        subprocess.run(cmd, check=True)
        
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except subprocess.CalledProcessError as e:
        print(f"Error running Gunicorn: {e}")
        sys.exit(1)
    except FileNotFoundError:
        print("Gunicorn not found. Please install it with: pip install gunicorn")
        sys.exit(1)

if __name__ == "__main__":
    run_gunicorn() 