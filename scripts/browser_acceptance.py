"""Black-box smoke checks for the SafeAI sign-in deployment boundary.

This deliberately does not sign in or use a real Supabase account. It verifies
that both apps render their honest account boundary, preserve the child/parent
account split, and remain usable at narrow and wide viewports. Set
SAFEAI_EXPECT_CONFIGURED=1 with the hosted URLs to require active sign-in
controls; the default local URLs accept the deliberately unconfigured boundary.
"""

import os

from playwright.sync_api import sync_playwright

CHILD_URL = os.environ.get("SAFEAI_CHILD_URL", "http://127.0.0.1:4173/")
PARENT_URL = os.environ.get("SAFEAI_PARENT_URL", "http://127.0.0.1:4174/")
EXPECT_CONFIGURED = os.environ.get("SAFEAI_EXPECT_CONFIGURED") == "1"


def check_page(page, url, role):
    console_errors = []
    page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
    page.goto(url, wait_until="networkidle")

    assert page.locator("main.auth-shell").count() == 1
    assert page.get_by_role("heading", level=1).count() == 1
    assert page.locator("input[type='email']").count() == 1
    assert page.locator("input[type='password']").count() == 1
    unavailable = page.get_by_role("status").filter(has_text="Account service unavailable")
    if EXPECT_CONFIGURED:
        assert unavailable.count() == 0
        assert not page.get_by_role("button", name="Sign in").is_disabled()
    else:
        assert unavailable.count() == 1
        assert page.get_by_role("button", name="Sign in").is_disabled()
    assert page.locator("body").evaluate("element => element.scrollWidth <= element.clientWidth")
    assert not console_errors, console_errors

    if role == "child":
        assert page.get_by_text("Ask your parent or guardian").count() == 1
        assert page.get_by_text("Create a new parent account").count() == 0
    else:
        assert page.get_by_role("button", name="Create a new parent account").count() == 1


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    try:
        for width, height in [(390, 844), (1280, 900)]:
            page = browser.new_page(viewport={"width": width, "height": height})
            check_page(page, CHILD_URL, "child")
            check_page(page, PARENT_URL, "parent")
            page.keyboard.press("Tab")
            assert page.locator(":focus").count() == 1
            page.close()
    finally:
        browser.close()

print("browser acceptance passed")
