"""
主应用测试
测试基本端点和功能
"""
import pytest
from fastapi.testclient import TestClient


def test_read_root(client: TestClient):
    """测试根路径"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data
    assert data["version"] == "1.0.0"


def test_health_check(client: TestClient):
    """测试健康检查"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "database" in data
    assert "timestamp" in data


def test_api_docs_available(client: TestClient):
    """测试API文档是否可用"""
    response = client.get("/api/v1/docs")
    assert response.status_code == 200


def test_openapi_schema_available(client: TestClient):
    """测试OpenAPI模式是否可用"""
    response = client.get("/api/v1/openapi.json")
    assert response.status_code == 200
    data = response.json()
    assert "openapi" in data
    assert "info" in data
    assert "paths" in data
