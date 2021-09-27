from datetime import datetime

# datetime object containing current date and time
def main(request, response):
    stash = request.server.stash
    key = request.GET[b"key"]
    prev = stash.take(key)
    value = 0
    if prev is not None:
        value = prev + 1
    stash.put(key, value)
    return [], str(value)