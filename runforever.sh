until node ddelection.js; do
    echo "Server crashed with exit code $?.  Respawning.." >&2
    sleep 1
done
