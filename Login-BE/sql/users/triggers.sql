CREATE OR REPLACE FUNCTION update_set_timestamp ()
    RETURNS TRIGGER
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER set_update_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_set_timestamp ();

-- CREATE OR REPLACE FUNCTION passwordInsert_set_timestamp ()
--     RETURNS TRIGGER
--     AS $$
-- BEGIN
--     NEW.password_at = NOW();
--     RETURN NEW;
-- END;
-- $$
-- LANGUAGE plpgsql;
-- CREATE TRIGGER set_passwordInsert_timestamp
--     BEFORE INSERT OF password ON users
--     FOR EACH ROW
--     EXECUTE PROCEDURE passwordInsert_set_timestamp ();
CREATE OR REPLACE FUNCTION passwordUpdate_set_timestamp ()
    RETURNS TRIGGER
    AS $$
BEGIN
    NEW.password_at = NOW();
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER set_passwordUpdate_timestamp
    BEFORE UPDATE OF password ON users
    FOR EACH ROW
    EXECUTE PROCEDURE passwordUpdate_set_timestamp ();

